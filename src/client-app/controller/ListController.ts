import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

/**
 * Singleton
 */
export namespace ListController {
  export function onNewListsAdded() {
    // attach new lists to the next list position
    // and add-card & adding-card is following it
    ViewCache.listsView.createNewLists();
  }

  export function onClickAddListAgain() {
    ViewCache.addingListView.reopen();
  }

  export function onCloseAddingList() {
    ViewCache.addListView.reopen();
  }

  /**
   * @param title list title
   * @param isAutoUpdate if true, it doesn't occur any saving operation to the server
   */
  export function onSetTitleInAddedList(title: string, isAutoUpdate: boolean) {
    Model.addNewList(title, isAutoUpdate);
  }
}
