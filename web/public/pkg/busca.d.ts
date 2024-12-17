/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<string>}
*/
export function fetch_ipv6(): Promise<string>;
/**
*/
export class Canvas {
  free(): void;
/**
* @param {HTMLCanvasElement} canvas
* @param {HTMLCanvasElement} canvas2
*/
  constructor(canvas: HTMLCanvasElement, canvas2: HTMLCanvasElement);
/**
* @param {number} width
* @param {number} height
* @param {number} ratio
*/
  resize(width: number, height: number, ratio: number): void;
/**
* @param {number} width
* @param {number} height
* @param {number} ratio
* @param {any} data
*/
  init(width: number, height: number, ratio: number, data: any): void;
/**
* @param {any} data
*/
  update(data: any): void;
/**
* @param {number} x
* @param {number} y
*/
  mouseover(x: number, y: number): void;
/**
*/
  mouseout(): void;
/**
* @param {number} width
* @param {number} height
* @param {number} space
* @param {number} total
*/
  draw_lines(width: number, height: number, space: number, total: number): void;
}
/**
*/
export class Data {
  free(): void;
/**
* @param {number} y
*/
  constructor(y: number);
/**
* @param {number} y
*/
  update_year(y: number): void;
/**
* @returns {any}
*/
  get_full_years(): any;
/**
* @returns {any}
*/
  get_geral(): any;
/**
* @returns {any}
*/
  get_post(): any;
/**
* @returns {any}
*/
  get_post_imagem(): any;
/**
* @returns {any}
*/
  get_post_musica(): any;
/**
* @returns {any}
*/
  get_post_texto(): any;
/**
* @returns {any}
*/
  get_post_video(): any;
/**
* @returns {any}
*/
  get_post_24(): any;
/**
* @returns {any}
*/
  get_day_geral(): any;
/**
* @returns {any}
*/
  get_day_post(): any;
/**
* @returns {any}
*/
  get_day_post_imagem(): any;
/**
* @returns {any}
*/
  get_day_post_musica(): any;
/**
* @returns {any}
*/
  get_day_post_texto(): any;
/**
* @returns {any}
*/
  get_day_post_video(): any;
/**
* @returns {any}
*/
  get_day_post_24(): any;
/**
* @returns {any}
*/
  get_soma(): any;
/**
* @param {any} data
* @param {number} year
* @param {number} month
* @param {number} date
* @param {number} operation
*/
  teste(data: any, year: number, month: number, date: number, operation: number): void;
/**
* @param {any} data
* @param {number} year
* @param {number} month
* @param {number} date
*/
  init(data: any, year: number, month: number, date: number): void;
/**
* @param {any} data
*/
  update(data: any): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_data_free: (a: number) => void;
  readonly data_new: (a: number) => number;
  readonly data_update_year: (a: number, b: number) => void;
  readonly data_get_full_years: (a: number) => number;
  readonly data_get_geral: (a: number) => number;
  readonly data_get_post: (a: number) => number;
  readonly data_get_post_imagem: (a: number) => number;
  readonly data_get_post_musica: (a: number) => number;
  readonly data_get_post_texto: (a: number) => number;
  readonly data_get_post_video: (a: number) => number;
  readonly data_get_post_24: (a: number) => number;
  readonly data_get_day_geral: (a: number) => number;
  readonly data_get_day_post: (a: number) => number;
  readonly data_get_day_post_imagem: (a: number) => number;
  readonly data_get_day_post_musica: (a: number) => number;
  readonly data_get_day_post_texto: (a: number) => number;
  readonly data_get_day_post_video: (a: number) => number;
  readonly data_get_day_post_24: (a: number) => number;
  readonly data_get_soma: (a: number) => number;
  readonly data_teste: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly data_init: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly data_update: (a: number, b: number) => void;
  readonly __wbg_canvas_free: (a: number) => void;
  readonly canvas_new: (a: number, b: number) => number;
  readonly canvas_resize: (a: number, b: number, c: number, d: number) => void;
  readonly canvas_init: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly canvas_update: (a: number, b: number) => void;
  readonly canvas_mouseover: (a: number, b: number, c: number) => void;
  readonly canvas_mouseout: (a: number) => void;
  readonly canvas_draw_lines: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly fetch_ipv6: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb8d01335e4c885bd: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h4a812093c680470c: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
