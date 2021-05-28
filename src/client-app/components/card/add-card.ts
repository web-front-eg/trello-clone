import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { ICard } from "../../models/ICard.js";
import { AddingCard } from "./adding-card.js";
import { autobind } from "../../decorators/autobind.js";
import * as Templates from "../../template/template-names.js";

export class AddCard
  extends BaseEntity<HTMLDivElement, AddingCard>
  implements ICard
{
  public content: string;
  private readonly fixedCurrentListPosition: number;

  constructor(templateInjector: TemplateInjector<HTMLDivElement>) {
    super(templateInjector, "AddCard");
    this.fixedCurrentListPosition = BaseEntity.currentListPosition - 1;

    this.init();
  }

  protected init(): void {
    this.currentEl.addEventListener("click", this.onClickAddCard);
  }

  protected reset(): void {
    this.currentEl.style.display = "none";
  }

  @autobind
  private onClickAddCard(_: Event): void {
    // re-using adding-card
    if (!this.nextEntity) {
      this.nextEntity = new AddingCard(
        new TemplateInjector<HTMLDivElement>(
          this.templateInjector.getCurElIdOrClassName,
          Templates.addingCard,
          "afterend",
          this.fixedCurrentListPosition
        ),
        this.fixedCurrentListPosition,
        this
      );
    } else {
      this.nextEntity.onAddCardClickedAgain();
    }
    this.reset();
  }

  public onAddingCardClosed(): void {
    // show add-card on closing adding-card
    this.currentEl.style.display = "block";
  }

  public onAddingCardAttached(addingCard: AddingCard): void {
    // attach add-card under the attached adding-card
    addingCard.getTemplateInjector.getCreatedEl.insertAdjacentElement(
      "afterend",
      this.currentEl
    );
  }
}
