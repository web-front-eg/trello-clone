import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { IList } from "../../model/IList.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";
import { AddingListView } from "./AddingListView.js";

export class AddListView
  extends View<HTMLDivElement, AddingListView>
  implements IList
{
  public content: string = "";
  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddListView");
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
    if (!this.nextView) {
      this.nextView = new AddingListView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.getCurElIdOrClassName,
          Templates.addingList,
          "afterend"
        ),
        this
      );
    }

    this.nextView.onAddListClickedAgain();
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
      this.nextView.getTemplateHelper.getCreatedEl
    );

    // click add-list since it's already created once
    this.currentEl.click();
  }
}
