import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddCardView } from "../card/AddCardView.js";
import { TemplateNames } from "../../template/TemplateNames.js";
import { ListController } from "../../controller/ListController.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { ListDragDrop } from "../drag-drop/ListDragDrop.js";

export class AddedListView extends View<HTMLDivElement> {
  private readonly titleEl = <HTMLElement>(
    this.currentEl.querySelector("strong")!
  );

  private readonly dragDrop: ListDragDrop = new ListDragDrop(this.currentEl);

  constructor(
    templateHelper: TemplateHelper<HTMLParagraphElement>,
    content: string,
    isAutoUpdate: boolean
  ) {
    super(templateHelper, "AddedListView");

    if (!this.titleEl) {
      throw new Error("title element is invalid!");
    }

    this.titleEl.innerText = content;

    this.init();

    // add new list to data set
    ListController.onSetTitleInAddedList(content, isAutoUpdate);
  }

  protected init() {
    ViewCache.setAddedListView = this;

    // attach add card initially
    if (!this.nextView) {
      this.nextView = new AddCardView(
        new TemplateHelper<HTMLParagraphElement>(
          this.templateHelper.currentElSelector,
          TemplateNames.addCard,
          "afterend",
          false,
          View.currentListPosition
        )
      );
    }
  }
}
