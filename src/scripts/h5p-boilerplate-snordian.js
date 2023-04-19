import Util from '@services/util';
import Dictionary from '@services/dictionary';
import '@styles/h5p-boilerplate-snordian.scss';

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
    this.params = Util.extend({
      sample: true,
      behaviour: {
        sample: 'Sample behaviour'
      },
      l10n: {
        sample: 'Sample l10n'
      },
      a11y: {
        sample: 'Sample a11y'
      }
    }, params);

    this.contentId = contentId;
    this.extras = extras;

    // Fill dictionary
    Dictionary.fill({ l10n: this.params.l10n, a11y: this.params.a11y });

    this.previousState = extras?.previousState || {};

    this.dom = this.buildDOM();
  }

  /**
   * Attach library to wrapper.
   * @param {H5P.jQuery} $wrapper Content's container.
   */
  attach($wrapper) {
    $wrapper.get(0).classList.add('h5p-boilerplate-snordian');
    $wrapper.get(0).appendChild(this.dom);
  }

  /**
   * Build main DOM.
   * @returns {HTMLElement} Main DOM.
   */
  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('h5p-boilerplate-snordian-main');
    dom.innerText = this.getTitle();

    return dom;
  }

  /**
   * Get task title.
   * @returns {string} Title.
   */
  getTitle() {
    // H5P Core function: createTitle
    return H5P.createTitle(
      this.extras?.metadata?.title || BoilerplateSNORDIAN.DEFAULT_DESCRIPTION
    );
  }

  /**
   * Get description.
   * @returns {string} Description.
   */
  getDescription() {
    return BoilerplateSNORDIAN.DEFAULT_DESCRIPTION;
  }
}

/** @constant {string} Default description */
BoilerplateSNORDIAN.DEFAULT_DESCRIPTION = 'Boilerplate (SNORDIAN)';
