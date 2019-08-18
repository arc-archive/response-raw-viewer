import {
  fixture,
  assert,
  nextFrame,
  html
} from '@open-wc/testing';
import '../response-raw-viewer.js';

describe('<response-raw-viewer>', function() {
  async function basicFixture() {
    let txt = 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    return (await fixture(html`<response-raw-viewer .responseText="${txt}"></response-raw-viewer>`));
  }

  async function emptyFixture() {
    return (await fixture(html`<response-raw-viewer></response-raw-viewer>`));
  }

  async function contentActionFixture() {
    return (await fixture(html`<response-raw-viewer>
      <button slot="content-action">Test</button>
    </response-raw-viewer>`));
  }

  describe('_actionsPanelClass', () => {
    it('returns hidden class when no response', async () => {
      const element = await emptyFixture();
      const result = element._actionsPanelClass;
      assert.equal(result, 'actions-panel hidden');
    });

    it('returns base class when response', async () => {
      const element = await basicFixture();
      const result = element._actionsPanelClass;
      assert.equal(result, 'actions-panel');
    });
  });

  describe('content actions', () => {
    let element;
    beforeEach(async () => {
      element = await contentActionFixture();
    });

    it('has distributed nodes', () => {
      const slot = element.shadowRoot.querySelector('slot[name="content-action"]');
      const buttons = slot.assignedNodes();
      assert.equal(buttons.length, 1);
    });

    it('actions are hidden when no response', async () => {
      const element = await emptyFixture();
      const node = element.shadowRoot.querySelector('.actions-panel');
      const result = getComputedStyle(node).display.trim();
      assert.equal(result, 'none');
    });

    it('actions are visible when response', async () => {
      element.responseText = 'test';
      await nextFrame();
      const node = element.shadowRoot.querySelector('.actions-panel');
      const result = getComputedStyle(node).display.trim();
      assert.notEqual(result, 'none');
    });
  });

  describe('response rendering', () => {
    function str2ab(str) {
      const buf = new ArrayBuffer(str.length * 2);
      const bufView = new Uint16Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }

    it('renders empty message when no response', async () => {
      const element = await emptyFixture();
      const node = element.shadowRoot.querySelector('.no-info');
      assert.ok(node);
    });

    it('renders cod eoutput when response', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('.raw-content');
      assert.ok(node);
    });

    it('converts value from ArrayBuffer', async () => {
      const ab = str2ab('test');
      const element = await emptyFixture();
      element.responseText = {
        type: 'Buffer',
        data: new Uint16Array(ab)
      };
      await nextFrame();
      const node = element.shadowRoot.querySelector('.raw-content');
      assert.equal(node.innerText.trim(), 'test');
    });
  });

  describe('_responseValue()', () => {
    let element;
    beforeEach(async () => {
      element = await emptyFixture();
    });

    function str2ab(str) {
      const buf = new ArrayBuffer(str.length * 2);
      const bufView = new Uint16Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }

    it('Returns undefined when argument is undefined', () => {
      assert.isUndefined(element._responseValue());
    });

    it('Returns empty string when argument is empty string', () => {
      const result = element._responseValue('');
      assert.equal(result, '');
    });

    it('Returns string value for string argument', () => {
      const result = element._responseValue('test');
      assert.equal(result, 'test');
    });

    it('Returns string value for string argument', () => {
      const result = element._responseValue('test');
      assert.equal(result, 'test');
    });

    it('Converts value from ARrayBuffer', () => {
      const ab = str2ab('test');
      const result = element._responseValue({
        type: 'Buffer',
        data: new Uint16Array(ab)
      });
      assert.equal(result, 'test');
    });

    it('Returns empty string for unsupported value', () => {
      const result = element._responseValue(new Date());
      assert.equal(result, '');
    });
  });

  describe('a11y', () => {
    it('the output has tabindex=0 when scrolled output', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('.raw-content');
      assert.equal(node.tabIndex, 0);
    });

    it('the output has tabindex=-1 when wrapped output', async () => {
      const element = await basicFixture();
      element.wrapText = true;
      await nextFrame();
      const node = element.shadowRoot.querySelector('.raw-content');
      assert.equal(node.tabIndex, -1);
    });

    it('is accessible when empty', async () => {
      const element = await emptyFixture();
      await assert.isAccessible(element);
    });

    it('is accessible with content', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('is accessible with wrapped content', async () => {
      const element = await basicFixture();
      element.wrapText = true;
      await nextFrame();
      await assert.isAccessible(element);
    });
  });
});
