export class TemplateInjector<TCreateEl extends HTMLElement> {
  private templateEl: HTMLTemplateElement;

  /**
   * rool element of this created element
   */
  private rootEl: HTMLDivElement;

  private createdEl: TCreateEl;
  /**
   * if not exists, it's falsy null
   */
  public get getCreatedEl(): TCreateEl {
    return this.createdEl;
  }

  private curElIdOrClassName: string;
  /**
   * if not exists, it's falsy ""
   */
  public get getCurElIdOrClassName(): string {
    return this.curElIdOrClassName;
  }

  constructor(
    rootIdorClassName: string,
    templateIdOrClassName: string,
    insertWhere: InsertPosition,
    nthOfResult?: number
  ) {
    // 1. set up the anchor tag and the template tag
    this.templateEl = document.getElementById(
      templateIdOrClassName
    )! as HTMLTemplateElement;

    if (!this.templateEl) {
      throw new Error(
        `template ID or Class ${templateIdOrClassName} is invalid!`
      );
    }

    if (!nthOfResult) {
      this.rootEl = document.querySelector(
        rootIdorClassName
      )! as HTMLDivElement;

      if (!this.rootEl) {
        throw new Error(`anchor ID or Class ${rootIdorClassName} is invalid!`);
      }
    } else {
      const allRoots = document.querySelectorAll(rootIdorClassName);
      const allRoot2 = new Array(nthOfResult)
        .fill("")
        .map((_, i) => {
          if (i === nthOfResult) {
            return 0;
          }
        });
      this.rootEl = allRoots[nthOfResult]! as HTMLDivElement;

      if (!this.rootEl) {
        throw new Error(`anchor ID or Class ${rootIdorClassName} is invalid!`);
      }
    }

    // 2. import a node from the template
    const imported = document.importNode(this.templateEl.content, true);

    // 3. get the first element child of the imported node
    this.createdEl = <TCreateEl>imported.firstElementChild;

    if (!this.createdEl) {
      throw new Error(`Element creation failed!`);
    }

    // if (newTemplateClassName) {
    //   this.createdEl.classList.add(newTemplateClassName);
    // }

    // 4. save id or class name of the created element.
    this.curElIdOrClassName = this.createdEl.id ? `#${this.createdEl.id}` : "";
    this.curElIdOrClassName = this.createdEl.className
      ? `.${this.createdEl.className}`
      : "";

    // 5. forward the position to insert the createdEl
    this.insertAt(insertWhere);
  }

  private insertAt(where: InsertPosition): void {
    this.rootEl.insertAdjacentElement(where, this.createdEl);
  }

  public removeMyself(): void {
    this.createdEl.remove();
  }
}
