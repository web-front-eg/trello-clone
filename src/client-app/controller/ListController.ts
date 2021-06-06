import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace ListController {
  export function onNewListsAdded() {
    ViewCache.listsView.attachNewLists();
    ViewCache.listsView.attachToNewListsFrom(ViewCache.addListView);
  }

  export function onClickAddListAgain() {
    ViewCache.addingListView.reopen();
  }

  export function onCloseAddingList() {
    ViewCache.addListView.reopen();
  }

  export function onSetTitleInAddedList(title: string, isAutoUpdate: boolean) {
    Model.addNewList(title, isAutoUpdate);
  }
}
