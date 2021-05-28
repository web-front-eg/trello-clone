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
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset(): void {
    this.currentEl.style.display = "none";
  }

  @autobind
  private onClickAddList(_: Event): void {
    // re-using adding-list
    if (!this.nextEntity) {
      this.nextEntity = new AddingList(
        new TemplateInjector<HTMLDivElement>(
          this.templateInjector.getCurElIdOrClassName,
          Templates.addingList,
          "afterend"
        ),
        this
      );
    }

    this.nextEntity.onAddListClickedAgain();
    this.reset();
  }

  @autobind
  private onFocusOut(_: Event): void {
    // hide add-list automatically on focusing out
    this.currentEl.style.display = "none";
  }

  public onAddingListClosed(): void {
    // show add-list on closing adding-card
    this.currentEl.style.display = "block";
  }

  public attachTo_afterFirstAddList(newParentEl: HTMLElement): void {
    // attach add-list to new parent element
    newParentEl.insertAdjacentElement("afterbegin", this.currentEl);

    // attach adding-list to add-list
    this.currentEl.insertAdjacentElement(
      "afterend",
      this.nextEntity.getTemplateInjector.getCreatedEl
    );

    // click add-list since it's already created once
    this.currentEl.click();
  }
}
