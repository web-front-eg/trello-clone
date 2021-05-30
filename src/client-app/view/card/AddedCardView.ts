import { View } from "../View.js";
import { IDraggable } from "../../model/IDraggable";
import { TemplateHelper } from "../../template/TemplateHelper";
import { CardController } from "../../controller/CardController.js";
import { autobind } from "../../decorator/autobind.js";

export class AddedCardView extends View<HTMLDivElement> implements IDraggable {
  /**
   *
   */
  private readonly titleEl: HTMLParagraphElement;
  public readonly id: number;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    content: string,
    parentListPos: number
  ) {
    super(templateHelper, "AddedCardView");

    this.titleEl = this.currentEl.querySelector(
      ".list__added-card__title"
    )! as HTMLParagraphElement;
    this.titleEl.textContent = content;

    CardController.onSetContentInAddedCard(parentListPos, content);

    this.init();
  }

  protected init(): void {
    this.currentEl.addEventListener("dragstart", this.onDragStart);
  }

  protected reset(): void {
    //
  }

  @autobind
  public onDragStart(e: DragEvent): void {
    console.log("Drag start!", this.id);

    e.dataTransfer!.setData("text/plain", this.id.toString());
    e.dataTransfer!.effectAllowed = "move";
  }

  @autobind
  public onDragEnd(e: DragEvent): void {
    //
  }
}
