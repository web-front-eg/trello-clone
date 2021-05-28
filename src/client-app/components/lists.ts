import { IList } from "../models/IList.js";
import { Stack } from "../typings.js";
import { TemplateInjector } from "../template/template-injector.js";
import * as Templates from "../template/template-names.js";
import { autobind } from "../decorators/autobind.js";
import { AddList } from "./list/add-list.js";
import { BaseEntity } from "./base-entity.js";
export class Lists extends BaseEntity<HTMLDivElement, AddList> {
  // private listColumnTemplateInjector: TemplateInjector<HTMLDivElement>;

  public static onListAdded_addNewListColumn: Function;
  private currentListPosition: number = 0;

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
    // this.listArr.push(

    // );

    this.init();
  }

  protected init(): void {
    // performs attching a new .add-list onto the next column
    // 새로운 .add-list 를 다음 열에 추가
    Lists.onListAdded_addNewListColumn = () => {
      // 1. remove the current .adding-list from the last .list-column
      //    현재 .adding-list 을 기존의 list-column 에서 삭제
      // this.listColumnTemplateInjector.removeMyself();

      // 2. add a new .list-column under #root
      //    새로운 .list-column 를 #root 에 추가
      this.templateInjector = new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.listColumn,
        "afterend",
        this.currentListPosition++
      );

      // 3. add new .add-list under .list
      //    새로운 .add-list 를 .list 아래에 추가
      // this.listColumnTemplateInjector = new TemplateInjector<HTMLDivElement>(
      //   this.listColumnTemplateInjector.getCurElIdOrClassName,
      //   Templates.addList,
      //   "afterbegin"
      // );
      // this.listArr.push(
      //   new AddList(
      //     new TemplateInjector<HTMLDivElement>(
      //       this.listColumnTemplateInjector.getCurElIdOrClassName,
      //       Templates.addList,
      //       "afterbegin"
      //     )
      //   )
      // );
      this.nextEntity = new AddList(
        new TemplateInjector<HTMLDivElement>(
          this.templateInjector.getCurElIdOrClassName,
          Templates.addList,
          "afterbegin",
          this.currentListPosition
        )
      );
      // console.log(this.listArr);

      // 4. 기존의 list
      // (this.listStack.pop() as AddingList<HTMLFormElement>).removeMyself();
    };
  }
}
