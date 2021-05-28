import { IList } from "../models/IList.js";
import { Stack } from "../typings.js";
import { TemplateInjector } from "../template/template-injector.js";
import * as Templates from "../template/template-names.js";
import { autobind } from "../decorators/autobind.js";
import { AddList } from "./list/add-list.js";
import { BaseEntity } from "./base-entity.js";
export class Lists extends BaseEntity<HTMLDivElement, AddList> {
  public static onListAdded_addNewListColumn: Function;

  constructor() {
    // 1. init template injector
    //    attach list under the #root
    //    add-list 를 #root 아래에 붙임
    super(
      new TemplateInjector<HTMLDivElement>(
        "#root",
        Templates.listColumn,
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
    Lists.onListAdded_addNewListColumn = () => {
      this.templateInjector = new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.listColumn,
        "afterend",
        BaseEntity.currentListPosition++
      );

      this.nextEntity = new AddList(
        new TemplateInjector<HTMLDivElement>(
          this.templateInjector.getCurElIdOrClassName,
          Templates.addList,
          "afterbegin",
          BaseEntity.currentListPosition
        )
      );
    };
  }
}
