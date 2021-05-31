import {
  AddListView,
  AddingListView,
  AddedListView,
  AddCardView,
  AddingCardView,
  AddedCardView,
  ListsView,
  View,
} from "../view/index.js";

export class ViewCache {
  /**
   *
   */
  private static _listsView: ListsView;

  public static get listsView(): ListsView {
    if (!ViewCache._listsView) {
      throw new Error("No cached lists view valid!");
    }
    return ViewCache._listsView;
  }

  public static set listsView(view: ListsView) {
    ViewCache._listsView = view;
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
  private static _addedListViews: Array<AddedListView> = [];

  public static getAddedListView(idx: number): AddedListView {
    if (ViewCache._addedListViews.length < 0) {
      throw new Error("No cached added card view valid!");
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
   *
   */
  private static _addCardViews: Array<AddCardView> = [];

  public static getAddCardView(idx: number): AddCardView {
    if (ViewCache._addCardViews.length < 0) {
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

  // private static _addingCardView: Array<AddingCardView> = [];

  // public static getAddingCardView(idx: number): AddingCardView {
  //   if (ViewCache._addingCardView.length < 0) {
  //     throw new Error("No cached adding card view valid!");
  //   }

  //   if (idx < 0 || idx > ViewCache._addCardViews.length) {
  //     throw new Error(
  //       "idx can't be 0 below or over the length of addingCardViews amount"
  //     );
  //   }

  //   const found = ViewCache._addingCardView.find(
  //     addingCardView => addingCardView.parentListPos === idx
  //   );
  //   if (!found) {
  //     throw new Error("No correspondant adding card!");
  //   }
  //   return found;
  // }

  // public static set setAddingCardView(view: AddingCardView) {
  //   ViewCache._addingCardView.push(view);
  // }
}
