import { IDraggable } from "models/IDraggable";
import { TemplateInjector } from "template/template-injector";

export class AddedCard implements IDraggable {
  private templateInjector: TemplateInjector<HTMLDivElement>;

  constructor() {
    this.templateInjector = new TemplateInjector<HTMLDivElement>(
      "CARD_ANCHOR",
      "template__added-card",
      "beforebegin"
    );
  }
  public dragStartHandler(e: DragEvent): void {}
  public dragEndHandler(e: DragEvent): void {}
}
