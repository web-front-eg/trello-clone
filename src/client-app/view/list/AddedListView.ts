import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { IDragTarget } from "../../model/IDragTarget";
import { AddCardView } from "../card/AddCardView.js";
import * as Templates from "../../template/TemplateNames.js";

export class AddedListView
  extends View<HTMLDivElement, AddCardView>
  implements IDragTarget
{
  private readonly title: HTMLElement;

  constructor(
    templateHelper: TemplateHelper<HTMLParagraphElement>,
    content: string
  ) {
    super(templateHelper, "AddedListView");

    this.title = this.currentEl
      .querySelector(".list____title")!
      .querySelector("strong")! as HTMLElement;

    this.title.textContent = content;

    this.init();
  }

  protected reset(): void {
    //
  }

  protected init(): void {
    // attach add card initially
    this.nextView = new AddCardView(
      new TemplateHelper<HTMLParagraphElement>(
        this.templateHelper.getCurElIdOrClassName,
        Templates.addCard,
        "afterend",
        View.currentListPosition - 1
      )
    );
  }

  public dragOverHandler(e: DragEvent): void {}

  public dropHandler(e: DragEvent): void {}

  public dragLeaveHandler(e: DragEvent): void {}
}
