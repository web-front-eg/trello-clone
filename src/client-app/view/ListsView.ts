import { ViewCache } from "../controller/ViewCache.js";
import { TemplateHelper } from "../template/TemplateHelper.js";
import { TemplateNames } from "../template/TemplateNames.js";
import { AddListView } from "./list/AddListView.js";
import { View } from "./View.js";

export class ListsView extends View<HTMLDivElement> {
  constructor() {
    // 1. attach list under the #root
    super(
      new TemplateHelper<HTMLDivElement>(
        "#root",
        TemplateNames.lists,
        "afterbegin"
      ),
      "ListsView"
    );

    // 2. attach the initial .add-list template under #root
    this.nextView = new AddListView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.currentElSelector,
        TemplateNames.addList,
        "afterbegin"
      )
    );

    this.init();
  }

  protected init() {
    ViewCache.listsView = this;
  }

  protected reset() {
    //
  }

  public createNewLists() {
    // create a new lists
    this.templateHelper = new TemplateHelper<HTMLDivElement>(
      this.templateHelper.currentElSelector,
      TemplateNames.lists,
      "afterend",
      false,
      ++View.currentListPosition
    );

    // move add-list & adding-list

    // attach add-list to new parent element
    this.templateHelper.createdEl.insertAdjacentElement(
      "afterbegin",
      this.nextView.currentEl
    );

    // attach adding-list to add-list
    this.nextView.currentEl.insertAdjacentElement(
      "afterend",
      this.nextView.nextView.currentEl
    );

    // click add-list since it's already created once
    this.nextView.currentEl.click();
  }
}
