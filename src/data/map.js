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

/**
 * Load the Directions widgets
 * @param {'@arcgis/core/views/MapView'} view
 */
export async function initDirections(view) {}

/**
 * Initialize the WebMap used in the application
 * @param {Number} webmapId
 * @returns Promise<`@arcgis/core/WebMap`>
 */
export async function initWebMap(webmapId) {}

// Fields
// https://jsapi.maps.arcgis.com/home/item.html?id=546747d854204d3ba068125f03910da9&sublayer=2&view=table&sortOrder=true&sortField=defaultFSOrder#data
/**
 * Takes an object with filters to apply to layer
 * @param {*} filter
 */
export function applyFilter(filter = {}) {}

/**
 * Initialize the MapView for the application
 * @param {HTMLElement} container
 * @returns Promise<void>
 */
export async function initView(container) {}

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
export async function fetchMaxElevation() {}

/**
 *
 * @param {{ min: Number, max: Number }}} elevation
 * @param {{ dog: String, bike: String, horse: String }} attributes
 * @returns Promise<{ features: `esri/Graphic` }>
 */
export async function fetchTrails(elevation, { dogs, bike, horse }) {}

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
export async function fetchTrailsInExtent(view) {}

/**
 * Filters map based on Feature Ids
 * @param {String[]} fids
 * @returns Promise<void>
 */
export async function filterMapData(fids) {}

/**
 * Returns a single feature (with all attributes), based on FID
 * @param {String} fid
 * @returns Promise<void>
 */
export async function getTrailFeature(fid) {}
