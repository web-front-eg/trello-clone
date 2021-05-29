import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace ListController {
  export const addNewColumn = (): void => {
    ViewCache.columnsView.addNewColumn();
  };

  export const onClickAddListAgain = (): void => {
    ViewCache.addingListView.onClickAddListAgain();
  };

  export const onCloseAddingList = (): void => {
    ViewCache.addListView.onClose();
  };

  export const attachAddListToNewColumn = (): void => {
    ViewCache.columnsView.attachToNewColumnFrom(ViewCache.addListView);
  };

  export const onSetTitleInAddedList = (title: string): void => {
    Model.addList(title);
  };
}
