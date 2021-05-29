import {
  AddListView,
  AddingListView,
  AddedListView,
  AddCardView,
  AddingCardView,
  AddedCardView,
  ColumnsView,
  View,
} from "../view/index.js";

export class ViewCache {
  /**
   *
   */
  private static _columnsView: ColumnsView;

  public static get columnsView(): ColumnsView {
    if (!ViewCache._columnsView) {
      throw new Error("No cached columns view valid!");
    }
    return ViewCache._columnsView;
  }

  public static set columnsView(view: ColumnsView) {
    ViewCache._columnsView = view;
  }

  /**
   *
   */
  private static _addListView: AddListView;

  public static get addListView(): AddListView {
    if (!ViewCache._addListView) {
      throw new Error("No cached add list view valid!");
    }
    return ViewCache._addListView;
  }

  public static set addListView(view: AddListView) {
    ViewCache._addListView = view;
  }

  /**
   *
   */
  private static _addingListView: AddingListView;

  public static get addingListView(): AddingListView {
    if (!ViewCache._addingListView) {
      throw new Error("No cached adding list view valid!");
    }
    return ViewCache._addingListView;
  }

  public static set addingListView(view: AddingListView) {
    ViewCache._addingListView = view;
  }

  /**
   *
   */
  private static _addCardViews: Array<AddCardView> = [];

  public static getAddCardView(idx: number): AddCardView {
    if (!ViewCache._addCardViews) {
      throw new Error("No cached add card view valid!");
    }

    if (idx < 0 || idx > ViewCache._addCardViews.length) {
      throw new Error(
        "idx can't be 0 below or over the length of addCardViews amount"
      );
    }

    return ViewCache._addCardViews[idx];
  }

  public static set setAddCardView(view: AddCardView) {
    ViewCache._addCardViews.push(view);
  }

  /**
   *
   */
  private static _addingCardView: Array<AddingCardView> = [];

  public static getAddingCardView(idx: number): AddingCardView {
    if (!ViewCache._addingCardView) {
      throw new Error("No cached adding card view valid!");
    }

    if (idx < 0 || idx > ViewCache._addCardViews.length) {
      throw new Error(
        "idx can't be 0 below or over the length of addingCardViews amount"
      );
    }

    const found = ViewCache._addingCardView.find(
      addingCardView => addingCardView.parentListPos === idx
    );
    if (!found) {
      throw new Error("No correspondant adding card!");
    }
    return found;
  }

  public static set setAddingCardView(view: AddingCardView) {
    ViewCache._addingCardView.push(view);
  }
}
