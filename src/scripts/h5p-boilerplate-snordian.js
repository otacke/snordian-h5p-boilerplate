import { extend } from '@services/util.js';
import { getSemanticsDefaults } from '@services/util-h5p.js';
import Dictionary from '@services/dictionary.js';
import '@styles/h5p-boilerplate-snordian.css';

/** @constant {string} Default description */
const DEFAULT_DESCRIPTION = 'Boilerplate (SNORDIAN)';

export default class BoilerplateSNORDIAN extends H5P.EventDispatcher {
  /**
   * @class
   * @param {object} params Parameters passed by the editor.
   * @param {number} contentId Content's id.
   * @param {object} [extras] Saved state, metadata, etc.
   */
  constructor(params, contentId, extras = {}) {
    super();

    // Sanitize parameters
    const defaults = extend({}, getSemanticsDefaults());
    this.params = extend(defaults, params);

    this.contentId = contentId;
    this.extras = extras;

    // Fill dictionary
    this.dictionary = new Dictionary();
    this.dictionary.fill({ l10n: this.params.l10n, a11y: this.params.a11y });

    this.previousState = this.extras.previousState || {};

    this.dom = this.buildDOM();
  }

  /**
   * Workaround for H5P core mutating prototype to inject its isRoot, but ES6 inheritance here.
   * @returns {boolean} True, if content type is root. Else false.
   */
  isRoot() {
    return !!this.extras.standalone;
  }

  /**
   * Workaround for H5P core mutating prototype to inject its getLibraryFilePath, but ES6 inheritance here.
   * Note that will not work in constructor, as this.libraryInfo is set only afterwards by H5P core.
   * @param {string} filePath Original filePath parameter.
   * @returns {string} Libary file path.
   */
  getLibraryFilePath = (filePath) => {
    return `${H5P.getLibraryPath(this.libraryInfo.versionedNameNoSpaces)}/${filePath}`;
  };

  /**
   * Attach library to wrapper.
   * @param {H5P.jQuery} $wrapper Content's container.
   */
  attach($wrapper) {
    const wrapper = $wrapper.get(0);
    wrapper.classList.add('h5p-boilerplate-snordian');
    wrapper.appendChild(this.dom);
  }

  /**
   * Build main DOM.
   * @returns {HTMLElement} Main DOM.
   */
  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('h5p-boilerplate-snordian-main');
    dom.textContent = this.getTitle();

    return dom;
  }

  /**
   * Get task title.
   * @returns {string} Title.
   */
  getTitle() {
    // H5P Core function: createTitle
    return H5P.createTitle(this.extras?.metadata?.title || DEFAULT_DESCRIPTION);
  }

  /**
   * Get description.
   * @returns {string} Description.
   */
  getDescription() {
    return DEFAULT_DESCRIPTION;
  }
}
