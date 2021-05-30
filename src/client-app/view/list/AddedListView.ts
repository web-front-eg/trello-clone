import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddCardView } from "../card/AddCardView.js";
import * as Templates from "../../template/TemplateNames.js";
import { ListController } from "../../controller/ListController.js";

export class AddedListView extends View<HTMLDivElement> {
  private readonly titleEl: HTMLElement;

  constructor(
    templateHelper: TemplateHelper<HTMLParagraphElement>,
    content: string
  ) {
    super(templateHelper, "AddedListView");

    this.titleEl = this.currentEl.querySelector("strong")! as HTMLElement;

    this.titleEl.innerText = content;
    ListController.onSetTitleInAddedList(content);

    this.init();
  }

  protected reset(): void {
    //
  }

  protected init(): void {
    // attach add card initially
    if (!this.nextView) {
      this.nextView = new AddCardView(
        new TemplateHelper<HTMLParagraphElement>(
          this.templateHelper.getCurElIdOrClassName,
          Templates.addCard,
          "afterend",
          false,
          View.currentListPosition
        )
      );
    }
  }
}
