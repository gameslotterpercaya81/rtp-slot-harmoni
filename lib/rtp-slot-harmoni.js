'use babel';

import RtpSlotHarmoniView from './rtp-slot-harmoni-view';
import { CompositeDisposable } from 'atom';

export default {

  rtpSlotHarmoniView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rtpSlotHarmoniView = new RtpSlotHarmoniView(state.rtpSlotHarmoniViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rtpSlotHarmoniView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rtp-slot-harmoni:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rtpSlotHarmoniView.destroy();
  },

  serialize() {
    return {
      rtpSlotHarmoniViewState: this.rtpSlotHarmoniView.serialize()
    };
  },

  toggle() {
    console.log('RtpSlotHarmoni was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
