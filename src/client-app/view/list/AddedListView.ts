import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddCardView } from "../card/AddCardView.js";
import { Template } from "../../template/TemplateNames.js";
import { ListController } from "../../controller/ListController.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { ListDragDrop } from "../drag-drop/ListDragDrop.js";

export class AddedListView extends View<HTMLDivElement> {
  private readonly titleEl: HTMLElement;
  private readonly dragDrop: ListDragDrop;

  constructor(
    templateHelper: TemplateHelper<HTMLParagraphElement>,
    content: string,
    isAutoUpdate: boolean
  ) {
    super(templateHelper, "AddedListView");
    this.dragDrop = new ListDragDrop(this.currentEl);

    this.titleEl = this.currentEl.querySelector("strong")! as HTMLElement;

    this.titleEl.innerText = content;
    
    this.init();
    
    ListController.onSetTitleInAddedList(content, isAutoUpdate);
  }

  protected reset(): void {
    //
  }

  protected init(): void {
    this.currentEl.draggable = true;
    ViewCache.setAddedListView = this;

    // attach add card initially
    if (!this.nextView) {
      this.nextView = new AddCardView(
        new TemplateHelper<HTMLParagraphElement>(
          this.templateHelper.getCurElIdOrClassName,
          Template.addCard,
          "afterend",
          false,
          View.currentListPosition
        )
      );
    }
  }
}
