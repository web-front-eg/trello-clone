// import { Controller } from "./Controller.js";
import {
  AddListView,
  AddedListView,
  AddingListView,
  View,
  ColumnsView,
} from "../view/index.js";

import * as Templates from "../template/TemplateNames.js";
import { TemplateHelper } from "../template/TemplateHelper.js";

import { Cache } from "./Cache.js";
import Model from "../model/Model.js";

export namespace ListController {
  const onClickAddList = (): void => {
    // (this.nextView as AddingListView).onAddListClickedAgain();
  };

  export const addNewColumn = (): void => {
    Cache.columnsView.addNewColumn();
  };

  export const updateAddList = (): void => {
    // cache.getCachedAddListView().attach(this.templateHelper.getCreatedEl);
    // attachAddListTo()
  };

  export const onClickAddListAgain = (): void => {
    Cache.addingListView.onClickAddListAgain();
  };

  export const onCloseAddingList = (): void => {
    Cache.addListView.onClose();
  };

  export const attachAddListTo = (): void => {
    Cache.columnsView.attachToNewColumn(Cache.addListView);
  };

  export const onListAdding = (): void => {};

  export const onListAdded = (): void => {
    // this.model.addList(listPos, title);
  };
}
