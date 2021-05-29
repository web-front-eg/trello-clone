import {
  AddListView,
  AddedListView,
  AddingListView,
  View,
  ColumnsView,
} from "../view/index.js";

export class Cache {
  /**
   *
   */
  private static _columnsView: ColumnsView;

  public static get columnsView(): ColumnsView {
    if (!Cache._columnsView) {
      throw new Error("No cached columns view valid!");
    }
    return Cache._columnsView;
  }

  public static set columnsView(view: ColumnsView) {
    Cache._columnsView = view;
  }

  /**
   *
   */
  private static _addListView: AddListView;

  public static get addListView(): AddListView {
    if (!Cache._addListView) {
      throw new Error("No cached add list view valid!");
    }
    return Cache._addListView;
  }

  public static set addListView(view: AddListView) {
    Cache._addListView = view;
  }

  /**
   *
   */
  private static _addingListView: AddingListView;

  public static get addingListView(): AddingListView {
    if (!Cache._addingListView) {
      throw new Error("No cached add list view valid!");
    }
    return Cache._addingListView;
  }

  public static set addingListView(view: AddingListView) {
    Cache._addingListView = view;
  }
}
