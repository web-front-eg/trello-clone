import { View } from "../View.js";
import { IDraggable } from "../../model/IDraggable";
import { TemplateHelper } from "../../template/TemplateHelper";

export class AddedCardView extends View<HTMLDivElement> implements IDraggable {
  private readonly title: HTMLParagraphElement;

  constructor(templateHelper: TemplateHelper<HTMLDivElement>, content: string) {
    super(templateHelper, "AddedCardView");

    this.title = this.currentEl.querySelector(
      ".list__added-card__title"
    )! as HTMLParagraphElement;
    this.title.textContent = content;

    this.init();
  }

  protected init(): void {}

  protected reset(): void {
    //
  }

  public dragStartHandler(e: DragEvent): void {}

  public dragEndHandler(e: DragEvent): void {}
}
