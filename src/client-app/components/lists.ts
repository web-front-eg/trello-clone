import { IList } from "../models/IList.js";
import { Stack } from "../typings.js";
import { TemplateInjector } from "../template/template-injector.js";
import * as Templates from "../template/template-names.js";
import { autobind } from "../decorators/autobind.js";
import { AddList } from "./list/add-list.js";
export class Lists {
  private listColumnTemplateInjector: TemplateInjector<HTMLDivElement>;

  public static onListAdded: Function;

  private listArr: Array<IList> = new Array<IList>();

  constructor() {
    // 1. init template injector
    //    attach list under the #root
    //    add-list 를 #root 아래에 붙임
    this.listColumnTemplateInjector = new TemplateInjector<HTMLDivElement>(
      "#root",
      Templates.listColumn,
      "afterbegin"
    );

    this.listArr.push(
      new AddList(
        new TemplateInjector<HTMLDivElement>(
          this.listColumnTemplateInjector.getCurElIdOrClassName,
          Templates.addList,
          "afterbegin"
        )
      )
    );
    console.log(this.listArr);

    this.initDelegate();
  }

  private initDelegate(): void {
    // performs attching a new .add-list onto the next column
    // 새로운 .add-list 를 다음 열에 추가
    Lists.onListAdded = () => {
      // 1. remove the current .adding-list from the last .list-column
      //    현재 .adding-list 을 기존의 list-column 에서 삭제
      // this.listColumnTemplateInjector.removeMyself();

      // 2. add a new .list-column under #root
      //    새로운 .list-column 를 #root 에 추가
      this.listColumnTemplateInjector = new TemplateInjector<HTMLDivElement>(
        "#root",
        Templates.listColumn,
        "afterbegin"
      );

      // 3. add new .add-list under .list
      //    새로운 .add-list 를 .list 아래에 추가
      // this.listColumnTemplateInjector = new TemplateInjector<HTMLDivElement>(
      //   this.listColumnTemplateInjector.getCurElIdOrClassName,
      //   Templates.addList,
      //   "afterbegin"
      // );
      this.listArr.push(
        new AddList(
          new TemplateInjector<HTMLDivElement>(
            this.listColumnTemplateInjector.getCurElIdOrClassName,
            Templates.addList,
            "afterbegin"
          )
        )
      );
      console.log(this.listArr);

      // 4. 기존의 list
      // (this.listStack.pop() as AddingList<HTMLFormElement>).removeMyself();
    };
  }
}
