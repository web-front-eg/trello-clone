import { ViewCache } from "../controller/ViewCache.js";
import { TemplateHelper } from "../template/TemplateHelper.js";
import { Template } from "../template/TemplateNames.js";
import { AddListView } from "./list/AddListView.js";
import { View } from "./View.js";

export class ListsView extends View<HTMLDivElement> {
  constructor() {
    // 1. init template injector
    //    attach list under the #root
    //    add-list 를 #root 아래에 붙임
    super(
      new TemplateHelper<HTMLDivElement>("#root", Template.lists, "afterbegin"),
      "ListsView"
    );

    // 2. attach the initial .add-list template under #root
    this.nextView = new AddListView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.getCurElIdOrClassName,
        Template.addList,
        "afterbegin"
      )
    );

    this.init();
  }

  protected init(): void {
    ViewCache.listsView = this;
  }

  protected reset(): void {
    //
  }

  public attachNewLists(): void {    
    this.templateHelper = new TemplateHelper<HTMLDivElement>(
      this.templateHelper.getCurElIdOrClassName,
      Template.lists,
      "afterend",
      false,
      ++View.currentListPosition
    );
  }

  public attachToNewListsFrom(addListView: AddListView): void {
    // attach add-list to new parent element
    this.templateHelper.getCreatedEl.insertAdjacentElement(
      "afterbegin",
      addListView.currentEl
    );

    // attach adding-list to add-list
    addListView.currentEl.insertAdjacentElement(
      "afterend",
      addListView.nextView.currentEl
    );

    // click add-list since it's already created once
    addListView.currentEl.click();
  }
}
