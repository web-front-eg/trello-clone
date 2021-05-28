import { TemplateInjector } from "template/template-injector.js";
import { ICard } from "../models/ICard.js";
import { IList } from "../models/IList.js";

export abstract class BaseEntity<
  TyHTMLEl extends HTMLElement,
  TyNextEntity extends IList | ICard = any
> {
  protected static currentListPosition: number = 0;
  protected currentEl: TyHTMLEl;
  protected nextEntity: TyNextEntity;

  protected templateInjector: TemplateInjector<TyHTMLEl>;
  public get getTemplateInjector(): TemplateInjector<TyHTMLEl> {
    return this.templateInjector;
  }

  constructor(
    templateInjector: TemplateInjector<TyHTMLEl>,
    currentEntityName: string
  ) {
    this.templateInjector = templateInjector;

    if (!this.templateInjector) {
      throw new Error(`No template injector valid!: ${currentEntityName}`);
    }

    this.currentEl = this.templateInjector.getCreatedEl! as TyHTMLEl;
  }

  protected abstract init(): void;
  protected abstract reset(): void;

  protected removeMyself(): void {
    this.templateInjector.removeMyself();
  }
}
