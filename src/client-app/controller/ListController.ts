import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace ListController {
  export function onNewListsAdded(): void {
    ViewCache.listsView.attachNewLists();
    ViewCache.listsView.attachToNewListsFrom(ViewCache.addListView);
  }

  export function onClickAddListAgain(): void {
    ViewCache.addingListView.reopen();
  }

  export function onCloseAddingList(): void {
    ViewCache.addListView.reopen();
  }

  export function onSetTitleInAddedList(title: string, isAutoUpdate: boolean): void {
    Model.addNewList(title, isAutoUpdate);
  }
}
