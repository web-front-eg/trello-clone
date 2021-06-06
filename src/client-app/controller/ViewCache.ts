import {
  AddListView,
  AddingListView,
  AddedListView,
  AddCardView,
  AddingCardView,
  ListsView,
} from "../view/index.js";


/**
 * static class for Cached View(s)
 * all the cached views are singleton objects
 */
export class ViewCache {
  public static reinit() {
    ViewCache._addedListViews = [];
    ViewCache._addCardViews = [];
  }

  /**
   * cached listsView
   */
  private static _listsView: ListsView;

  public static get listsView(): ListsView {
    if (!ViewCache._listsView) {
      throw new Error("No cached lists view is valid!");
    }

    return ViewCache._listsView;
  }

  public static set listsView(view: ListsView) {
    ViewCache._listsView = view;
  }

  /**
   * cached addListView
   */
  private static _addListView: AddListView;

  public static get addListView(): AddListView {
    if (!ViewCache._addListView) {
      throw new Error("No cached add list view is valid!");
    }

    return ViewCache._addListView;
  }

  public static set addListView(view: AddListView) {
    ViewCache._addListView = view;
  }

  /**
   * cached addingListView
   */
  private static _addingListView: AddingListView;

  public static get addingListView(): AddingListView {
    if (!ViewCache._addingListView) {
      throw new Error("No cached adding list view is valid!");
    }

    return ViewCache._addingListView;
  }

  public static set addingListView(view: AddingListView) {
    ViewCache._addingListView = view;
  }

  /**
   * cached addedCardView array
   */
  private static _addedListViews: Array<AddedListView> = [];

  public static getAddedListView(idx: number): AddedListView {
    if (ViewCache._addedListViews.length < 0) {
      throw new Error("No cached added card view is valid!");
    }

    if (idx < 0 || idx > ViewCache._addCardViews.length) {
      throw new Error(
        "idx can't be 0 below or over the length of addedListViews amount"
      );
    }

    return ViewCache._addedListViews[idx];
  }

  public static set setAddedListView(view: AddedListView) {
    ViewCache._addedListViews.push(view);
  }

  /**
   * cached addCardView array
   */
  private static _addCardViews: Array<AddCardView> = [];

  public static getAddCardView(idx: number): AddCardView {
    if (ViewCache._addCardViews.length < 0) {
      throw new Error("No cached add card view is valid!");
    }

    if (idx < 0 || idx > ViewCache._addCardViews.length) {
      throw new Error(
        "idx can't be 0 below or over the length of addCardViews amount"
      );
    }

    return ViewCache._addCardViews[idx];
  }

  public static getAddCardViewAll(): Array<AddCardView> {
    if (ViewCache._addCardViews.length < 0) {
      throw new Error("No cached add card view valid!");
    }

    return ViewCache._addCardViews;
  }

  public static set setAddCardView(view: AddCardView) {
    ViewCache._addCardViews.push(view);
  }

  /**
   * cached addingCardView
   */
  private static _addingCardView: AddingCardView;

  public static get addingCardView(): AddingCardView {
    if (!ViewCache._addingCardView) {
      throw new Error("No cached adding card view valid!");
    }

    return ViewCache._addingCardView;
  }

  public static set addingCardView(view: AddingCardView) {
    ViewCache._addingCardView = view;
  }
}
