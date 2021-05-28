import { BaseEntity } from "../base-entity.js";
import { ICard } from "../../models/ICard.js";
import { IDraggable } from "../../models/IDraggable";
import { TemplateInjector } from "../../template/template-injector";

export class AddedCard
  extends BaseEntity<HTMLDivElement>
  implements IDraggable, ICard
{
  public content: string;
  constructor(
    templateInjector: TemplateInjector<HTMLDivElement>,
    content: string
  ) {
    super(templateInjector, "AddedCard");
    this.content = content;
    this.init();
  }

  protected init(): void {}

  public dragStartHandler(e: DragEvent): void {}

  public dragEndHandler(e: DragEvent): void {}
}
