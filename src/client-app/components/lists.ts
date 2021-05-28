import { TemplateInjector } from "../template/template-injector.js";
import * as Templates from "../template/template-names.js";
import { AddList } from "./list/add-list.js";
import { BaseEntity } from "./base-entity.js";
export class Lists extends BaseEntity<HTMLDivElement, AddList> {
  public static onListAdded_addNewList: Function;

  constructor() {
    // 1. init template injector
    //    attach list under the #root
    //    add-list 를 #root 아래에 붙임
    super(
      new TemplateInjector<HTMLDivElement>(
        "#root",
        Templates.list,
        "afterbegin"
      ),
      "Lists"
    );

    // 2. inject the initial .add-list template under #root
    this.nextEntity = new AddList(
      new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addList,
        "afterbegin"
      )
    );

    this.init();
  }

  protected init(): void {
    // performs attching a new .add-list onto the next column
    // 새로운 .add-list 를 다음 열에 추가
    Lists.onListAdded_addNewList = () => {
      this.templateInjector = new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.list,
        "afterend",
        BaseEntity.currentListPosition++
      );
      this.nextEntity.attachTo_afterFirstAddList(this.templateInjector.getCreatedEl);
    };
  }

  protected reset(): void {
    //
  }
}
