import WebMap from '@arcgis/core/WebMap';

import MapView from '@arcgis/core/views/MapView';

import Bookmark from '@arcgis/core/webmap/Bookmark';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

import CustomContent from '@arcgis/core/popup/content/CustomContent';

import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Directions from '@arcgis/core/widgets/Directions';
import Expand from '@arcgis/core/widgets/Expand';
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile';
import ElevationProfileLineQuery from '@arcgis/core/widgets/ElevationProfile/ElevationProfileLineQuery';

import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import { buffer, union } from '@arcgis/core/geometry/geometryEngine';

// Object to handle module level variables
const app = {};

// Layer id for trails
const TRAIL_ID = '17275f72a4f-layer-2';
const TRAILHEAD_ID = '17275f72a2b-layer-0';

// Symbol Markers for Trail Heads
const trailheadRenderer = {
  type: 'simple',
  symbol: {
    type: 'web-style',
    name: 'trail',
    styleName: 'Esri2DPointSymbolsStyle',
  },
};
const trailSym = {
  type: 'cim',
  // CIM Line Symbol
  data: {
    type: 'CIMSymbolReference',
    symbol: {
      type: 'CIMLineSymbol',
      symbolLayers: [
        {
          // white dashed layer at center of the line
          type: 'CIMSolidStroke',
          effects: [
            {
              type: 'CIMGeometricEffectDashes',
              dashTemplate: [2, 2, 2, 2], // width of dashes and spacing between the dashes
              lineDashEnding: 'NoConstraint',
              controlPointEnding: 'NoConstraint',
            },
          ],
          enable: 'true', // must be set to true in order for the symbol layer to be visible
          capStyle: 'Butt',
          joinStyle: 'Round',
          width: 1,
          color: [255, 255, 255, 255],
        },
        {
          // lighter green line layer that surrounds the dashes
          type: 'CIMSolidStroke',
          enable: 'true',
          capStyle: 'Butt',
          joinStyle: 'Round',
          width: 3,
          color: [56, 168, 0, 255],
        },
        {
          // darker green outline around the line symbol
          type: 'CIMSolidStroke',
          enable: true,
          capStyle: 'Butt',
          joinStyle: 'Round',
          width: 6,
          color: [0, 115, 76, 255],
        },
      ],
    },
  },
};

const elevationProfile = new ElevationProfile({
  profiles: [
    {
      type: 'input',
    },
    {
      type: 'ground',
    },
  ],
  visibleElements: {
    legend: false,
    clearButton: false,
    settingsButton: false,
    sketchButton: false,
    selectButton: false,
    uniformChartScalingToggle: true,
  },
});

const contentWidget = new CustomContent({
  outFields: ['*'],
  creator: async ({ graphic }) => {
    if (graphic.geometry.type !== 'polyline') {
      return;
    }
    if (app.view && !elevationProfile.view) {
      elevationProfile.view = app.view;
    }
    elevationProfile.input = graphic;
    return elevationProfile;
  },
});

/**
 * Load the Directions widgets
 * @param {'@arcgis/core/views/MapView'} view
 */
export async function initDirections(view) {
  view = view || app.view;
  if (app.directions) return;
  // directions
  const directions = new Directions({
    // ago user geocoder
    view,
  });

  const directionsExpand = new Expand({
    content: directions,
  });

  view.ui.move('zoom', 'top-right');

  view.ui.add(directionsExpand, 'top-right');

  app.directions = directions;
}

/**
 * Initialize the WebMap used in the application
 * @param {Number} webmapId
 * @returns Promise<`@arcgis/core/WebMap`>
 */
export async function initWebMap(webmapId) {
  if (app.webmap) return;
  const webmap = new WebMap({
    portalItem: {
      id: webmapId,
    },
  });
  app.webmap = webmap;

  const notesLayer = new FeatureLayer({
    portalItem: {
      id: '1327d21d42934da3b7df7454d001c2bb',
    },
  });

  // Parse locally saved bookmarks
  const bookmarksLocal =
    JSON.parse(localStorage.getItem('trail-bookmarks')) || [];

  webmap.bookmarks = bookmarksLocal.map((a) => Bookmark.fromJSON(a));

  const elevationLayer = new ElevationLayer({
    url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer/',
  });

  elevationLayer.load();
  await whenOnce(() => elevationLayer.loadStatus === 'loaded');
  await notesLayer.load();

  const trailLayer = new GraphicsLayer({ id: 'trail' });

  const terrainLayer = new TileLayer({
    blendMode: 'source-in',
    portalItem: {
      id: '99cd5fbd98934028802b4f797c4b1732',
    },
    opacity: 1,
  });

  const groupLayer = new GroupLayer({
    id: 'group',
    layers: [trailLayer, terrainLayer],
  });

  webmap.add(groupLayer);

  if (!app.elevationLayer) {
    elevationProfile.profiles.push(
      new ElevationProfileLineQuery({
        source: elevationLayer,
        color: 'green',
      })
    );
  }

  app.elevationLayer = elevationLayer;
  app.notesLayer = notesLayer;
  await webmap.loadAll();

  // hiking trails
  const hikingLayer = webmap.findLayerById(TRAIL_ID);
  hikingLayer.outFields = ['*'];
  // hikingLayer.visible = false;
  hikingLayer.load();
  await whenOnce(() => hikingLayer.loadStatus === 'loaded');

  const textContent = new CustomContent({
    outFields: ['*'],
    creator: async ({ graphic }) => {
      const trailId = graphic.attributes.FID;
      const query = app.notesLayer.createQuery();
      query.outFields = ['*'];
      query.where = `TrailId = ${trailId}`;
      const attrs = graphic.attributes;
      const { features } = await app.notesLayer
        .queryFeatures(query)
        .catch((err) => console.warn(err.message));
      let notes = `<p>No notes available</p>`;
      const content = `<strong>${attrs.name}</strong> is a trail with <strong>${attrs.surface}</strong> surface. It is managed by <strong>${attrs.manager}</strong>.`;
      if (features && features.length) {
        const list = features.map(
          (feature) => `<li>${feature.attributes.Note}</li>`
        );
        return `
      ${content}
      <hr />
      ${list}
      `;
      } else {
        return `
      ${content}
      <hr />
      ${notes}
      `;
      }
    },
  });

  hikingLayer.popupTemplate.content = [textContent, contentWidget];
  // TrailHeads layer
  const layer = webmap.findLayerById(TRAILHEAD_ID);
  await layer.load();
  layer.visible = true;

  return webmap;
}

// Fields
// https://jsapi.maps.arcgis.com/home/item.html?id=546747d854204d3ba068125f03910da9&sublayer=2&view=table&sortOrder=true&sortField=defaultFSOrder#data
/**
 * Takes an object with filters to apply to layer
 * @param {*} filter
 */
export function applyFilter(filter = {}) {
  /**
   * {
   *   type: String,
   *   surface: String,
   * }
   */
  let clause = ``;
  for (let key in filter) {
    clause += `${key} in ('${filter[key]}')`;
  }

  if (!clause.length) {
    return;
  }
  const hikingLayer = app.webmap.findLayerById(TRAIL_ID);
  hikingLayer.visible = true;
  hikingLayer.definitionExpression = clause;
}

/**
 * Initialize the MapView for the application
 * @param {HTMLElement} container
 * @returns Promise<void>
 */
export async function initView(container) {
  const view = new MapView({
    container,
    map: app.webmap,
    popup: {
      defaultPopupTemplateEnabled: false,
      dockEnabled: true,
      dockOptions: {
        position: 'bottom-left',
        buttonEnabled: false,
        breakpoint: false,
      },
    },
  });
  const toggle = new BasemapToggle({ view, nextBasemap: 'hybrid' });

  const bookmarks = new Bookmarks({
    view: view,
    editingEnabled: true,
    bookmarkCreationOptions: {
      takeScreenshot: true,
      captureExtent: true,
      screenshotSettings: {
        width: 100,
        height: 100,
      },
    },
  });

  const bookmarksExpand = new Expand({
    content: bookmarks,
  });

  view.ui.add(toggle, 'bottom-right');
  view.ui.add(bookmarksExpand, 'top-right');

  app.view = view;

  app.view.when(() => {
    // set up bookmarks
    bookmarks.bookmarks.on('change', ({ added }) => {
      // Save bookmarks to local storage
      const bookmarksJson = added.map((x) => x.toJSON());
      let bookmarkStored =
        JSON.parse(localStorage.getItem('trail-bookmarks')) || [];
      localStorage.removeItem('trail-bookmarks');
      bookmarkStored = bookmarkStored.concat(bookmarksJson);
      localStorage.setItem('trail-bookmarks', JSON.stringify(bookmarkStored));
    });
  });

  return view;
}

/**
 * Creates a renderer using a given Arcade Expression
 * @param {String} exp
 * @returns `esri/renderer/UniqueValueRenderer`
 */
function applyTrailRenderer(exp) {
  const renderer = {
    type: 'unique-value',
    valueExpression: exp,
    uniqueValueInfos: [
      {
        value: true,
        symbol: trailSym,
        label: 'cim',
      },
    ],
  };
  return renderer;
}

/**
 * Finds the maximum elevation for a layer
 * @returns Promise<Number>
 */
export async function fetchMaxElevation() {
  if (!app.webmap) {
    return;
  }
  const maxStat = {
    statisticType: 'max',
    onStatisticField: 'max_elevat',
    outStatisticFieldName: 'Max_Elevation',
  };

  const layer = app.webmap.findLayerById(TRAIL_ID);

  await layer.load();
  const query = layer.createQuery();
  query.where = '1=1';
  query.outStatistics = [maxStat];
  const results = await layer.queryFeatures(query);
  const elev = results.features[0].attributes['Max_Elevation'];
  return elev;
}

/**
 *
 * @param {{ min: Number, max: Number }}} elevation
 * @param {{ dog: String, bike: String, horse: String }} attributes
 * @returns Promise<{ features: `esri/Graphic` }>
 */
export async function fetchTrails(elevation, { dogs, bike, horse }) {
  const [min, max] = elevation;
  if (!app.webmap) return;
  await app.webmap.load();

  const layer = app.webmap.findLayerById(TRAIL_ID);
  layer.outFields = ['*'];
  await layer.load();
  const query = layer.createQuery();
  query.returnDistinct = true;
  query.outFields = ['*'];
  query.where = `(min_elevat > ${min} AND max_elevat < ${max}) AND ${
    dogs ? "(dogs <> 'no' AND dogs <> ' ')" : "(dogs = 'no' OR dogs = ' ')"
  } AND ${
    bike ? "(bike <> 'no'  AND bike <> ' ')" : "(bike = 'no' OR bike = ' ')"
  } AND ${
    horse
      ? "(horse <> 'no'  AND horse <> ' ')"
      : "(horse = 'no' OR horse = ' ')"
  }`;
  const { features } = await layer.queryFeatures(query);
  return { features };
}

/**
 * Function to help find features in the current extent.
 *
 * Sample:
 *
 *  view.watch(
 *    'stationary',
 *       debounce((stationary) => {
 *       if (!stationary) return;
 *        fetchTrailsInExtent()
 *        .then((results) => {
 *          // do something with results
 *        })
 *        .catch((err) => console.log(err));
 *    })
 *  );
 */

/**
 *
 * @param {'@arcgis/core/views/MapView'} view
 * @returns Array<{}>
 */
export async function fetchTrailsInExtent(view) {
  view = view || app.view;
  if (!view && !app.view) return;

  await whenOnce(() => view.stationary);

  await view.when();
  await view.map.load();

  const layer = view.map.findLayerById(TRAIL_ID);
  const query = layer.createQuery();

  query.geometry = view.extent.clone();
  query.outFields = ['*'];
  query.returnGeometry = false;

  // Limit results to 100 at a time
  query.num = 100;

  // Order results by name
  query.orderByFields = ['name'];

  const { features } = await layer.queryFeatures(query);
  return features;
}

/**
 * Filters map based on Feature Ids
 * @param {String[]} fids
 * @returns Promise<void>
 */
export async function filterMapData(fids) {
  if (!app.webmap) return;

  const where = `FID in (${fids.join(',')})`;

  await app.webmap.load();

  const layer = app.webmap.findLayerById(TRAIL_ID);
  layer.outFields = ['*'];
  await layer.load();
  await app.view.when();
  const layerView = await app.view
    .whenLayerView(layer)
    .catch((err) => console.log(err.message));
  if (!layerView) return;

  await whenOnce(() => !layerView.updating);
  const query = layer.createQuery();
  query.returnGeometry = true;
  query.outFields = ['*'];
  query.where = where;
  const { features } = await layer.queryFeatures(query);

  const ids = await layer.queryObjectIds(query.clone());
  const arcade =
    `
	 if(indexof([` +
    ids +
    `], $feature.FID) != -1){
	  return true;
	}
	else {
	  return false;
	} 
  `;

  const renderer = applyTrailRenderer(arcade);
  layer.renderer = renderer;

  const groupLayer = app.webmap.findLayerById('group');
  const trailLayer = app.webmap.findLayerById('trail');

  const trailHeadsLayer = app.webmap.findLayerById(TRAILHEAD_ID);
  trailHeadsLayer.renderer = trailheadRenderer;

  if (!features.length) {
    return;
  }
  const geometries = features.map((x) => x.geometry);
  const bufferedFeatures = buffer(geometries, 1, 'miles');
  const geometry = union(bufferedFeatures);

  trailLayer.removeAll();

  trailLayer.add({
    attributes: {},
    geometry,
    symbol: {
      type: 'simple-fill',
      outline: { color: [255, 255, 255, 1] },
      color: [255, 255, 255, 0.5],
    },
  });

  groupLayer.visible = true;
  app.webmap.basemap.visible = false;
  await app.view.goTo(geometry);
  layerView.featureEffect = {
    filter: {
      where,
    },
    excludedEffect: 'grayscale(25%) opacity(35%)',
  };
}

/**
 * Returns a single feature (with all attributes), based on FID
 * @param {String} fid
 * @returns Promise<void>
 */
export async function getTrailFeature(fid) {
  const layer = app.webmap.findLayerById(TRAIL_ID);
  const query = layer.createQuery();
  query.outFields = ['*'];
  query.where = `FID = ${fid}`;
  const { features } = await layer.queryFeatures(query);
  return features[0];
}
