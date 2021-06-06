import { TemplateHelper } from "../template/TemplateHelper.js";

export abstract class View<T extends HTMLElement> {
  public static currentListPosition: number = -1;

  public reinitCurrentListPosition() {
    View.currentListPosition = -1;
  }

  public readonly currentEl: T;
  public nextView: View<T>;

  constructor(
    public templateHelper: TemplateHelper<T>,
    currentViewName: string
  ) {
    if (!this.templateHelper) {
      throw new Error(`No template helper is valid!: ${currentViewName}`);
    }

    this.currentEl = this.templateHelper.createdEl! as T;
  }

  protected abstract init(): void;

  protected reset(): void {
    this.close();
  }

  public reopen(): void {
    this.currentEl.style.display = "block";
  }

  public close(): void {
    this.currentEl.style.display = "none";
  }

  public click(): void {
    this.onClick();
  }

  protected onClick(e?: Event): void {}

  protected removeMyself() {
    this.templateHelper.removeMyself();
  }
}
