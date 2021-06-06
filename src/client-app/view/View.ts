import { TemplateHelper } from "../template/TemplateHelper.js";

export abstract class View<T extends HTMLElement> {
  public static currentListPosition: number = -1;
  public reinitCurrentListPosition() {
    View.currentListPosition = -1;
  }
  public currentEl: T;
  public nextView: View<T>;
  public templateHelper: TemplateHelper<T>;

  constructor(templateHelper: TemplateHelper<T>, currentViewName: string) {
    this.templateHelper = templateHelper;

    if (!this.templateHelper) {
      throw new Error(`No template injector valid!: ${currentViewName}`);
    }

    this.currentEl = this.templateHelper.getCreatedEl! as T;
  }

  protected abstract init(): void;
  protected abstract reset(): void;

  protected removeMyself() {
    this.templateHelper.removeMyself();
  }
}
