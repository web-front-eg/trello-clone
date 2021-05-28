import { TemplateInjector } from "../../template/template-injector.js";
import { IList } from "../../models/IList.js";
import { autobind } from "../../decorators/autobind.js";
import * as Templates from "../../template/template-names.js";
import { AddingList } from "./adding-list.js";
import { Lists } from "../lists.js";

export class AddList implements IList {
  public content: string = "";
  private addListDivEl: HTMLDivElement;
  private listArr: Array<IList> = new Array<IList>();

  constructor(private templateInjector: TemplateInjector<HTMLDivElement>) {
    if (!this.templateInjector) {
      throw new Error("No template injector valid!");
    }

    this.addListDivEl = this.templateInjector.getCreatedEl!;

    this.init();
  }

  private init(): void {
    this.addListDivEl.addEventListener("click", this.onClickAddList);
  }

  @autobind
  private onClickAddList(_: Event): void {
    this.listArr.push(
      new AddingList(
        new TemplateInjector<HTMLDivElement>(
          this.templateInjector.getCurElIdOrClassName,
          Templates.addingList,
          "afterbegin"
        )
      )
    );

    // this.addListDivEl.remove();
    // Lists.onListAdded();
  }
}
