import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { IList } from "../../models/IList.js";
import { autobind } from "../../decorators/autobind.js";
import * as Templates from "../../template/template-names.js";
import { AddingList } from "./adding-list.js";

export class AddList
  extends BaseEntity<HTMLDivElement, AddingList>
  implements IList
{
  public content: string = "";
  constructor(templateInjector: TemplateInjector<HTMLDivElement>) {
    super(templateInjector, "AddList");
    this.init();
  }

  protected init(): void {
    this.currentEl.addEventListener("click", this.onClickAddList);
  }

  @autobind
  private onClickAddList(_: Event): void {
    this.nextEntity = new AddingList(
      new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addingList,
        "afterend"
      )
    );

    // TODO: change remote to hide div itself due to there must be
    // a return point of return
    this.currentEl.style.display = "none";
    // this.currentEl.remove();
  }
}
