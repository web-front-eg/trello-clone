import { TemplateHelper } from "../template/TemplateHelper.js";
import * as Templates from "../template/TemplateNames.js";
import { AddListView } from "./list/AddListView.js";
import { View } from "./View.js";

export class ColumnsView extends View<HTMLDivElement, AddListView> {
  public static onListAdded: Function;

  constructor() {
    // 1. init template injector
    //    attach list under the #root
    //    add-list 를 #root 아래에 붙임
    super(
      new TemplateHelper<HTMLDivElement>(
        "#root",
        Templates.column,
        "afterbegin"
      ),
      "ColumnsView"
    );

    // 2. inject the initial .add-list template under #root
    this.nextView = new AddListView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.getCurElIdOrClassName,
        Templates.addList,
        "afterbegin"
      )
    );

    this.init();
  }

  protected init(): void {
    // performs attching a new .add-list onto the next column
    // 새로운 .add-list 를 다음 열에 추가
    ColumnsView.onListAdded = () => {
      this.templateHelper = new TemplateHelper<HTMLDivElement>(
        this.templateHelper.getCurElIdOrClassName,
        Templates.column,
        "afterend",
        View.currentListPosition++
      );
      this.nextView.attachTo_afterFirstAddList(
        this.templateHelper.getCreatedEl
      );
    };
  }

  protected reset(): void {
    //
  }
}
