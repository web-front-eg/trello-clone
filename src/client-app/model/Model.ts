import { rebuildLists } from "../view/RebuildLists.js";
import { Service } from "../service/Service.js";
import { StateHolder } from "./StateHolder.js";
import { makeNewStateFromHTML } from "../view/makeStateFromHTML.js";

/**
 * state, db operation happens here
 */
class Model {
  private readonly stateHolder: StateHolder = new StateHolder();

  constructor(detectInterval: number = 10) {
    this.syncFromServer(detectInterval);
  }

  /**
   * @param title list title
   * @param isAutoUpdate if true, no saving operation to the server occurs
   */
  public addNewList(title: string, isAutoUpdate: boolean) {
    this.stateHolder.pushList(title);

    if (!isAutoUpdate) {
      this.saveToServer();
    }
  }

  /**
   * @param listPos at which list a card is supposed to be inserted
   * @param content card content
   * @param isAutoUpdate if true, no saving operation to the server occurs
   */
  public addNewCard(listPos: number, content: string, isAutoUpdate: boolean) {
    this.stateHolder.pushCard(listPos, content);
    if (!isAutoUpdate) {
      this.saveToServer();
    }
  }

  /**
   * POST lists to the server
   */
  private async saveToServer() {
    await Service.POST_SaveLists(this.stateHolder.state);
  }

  /**
   * @param syncInterval sync interval
   */
  private async syncFromServer(syncInterval: number) {
    setInterval(async () => {
      try {
        const hasChanged: boolean = await Service.POST_DetectAnyChanges(
          this.stateHolder.state
        );

        // load and sync if there's any changes
        if (hasChanged) {
          const loadedLists = await Service.GET_LoadLists();
          // wipe out the last state before rebuilding a new state
          this.stateHolder.reinitList();
          rebuildLists(loadedLists);
        }
      } catch (e: unknown) {
        console.error(
          `detect any change has been failed! error status code: `,
          e as Error
        );
      }
    }, syncInterval * 1000);
  }

  /**
   * update state from html
   */
  public updateStateFromHTML() {
    this.stateHolder.state = makeNewStateFromHTML();
    // and save the new changes
    this.saveToServer();
  }
}

export default new Model(5);
