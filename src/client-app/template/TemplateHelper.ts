export class TemplateHelper<TCreateEl extends HTMLElement> {
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

  /**
   *
   * @param rootIdorClassName key to find root Element
   * @param templateIdOrClassName key to find template
   * @param insertWhere insert position
   * @param listPos list position at head (index)
   * @param isManualInserted deroute to insert manually the created element from template
   */
  constructor(
    rootIdorClassName: string,
    templateIdOrClassName: string,
    insertWhere: InsertPosition,
    listPos?: number,
    private isManualInserted: boolean = false
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

    if (!this.isManualInserted) {
      if (!listPos) {
        this.rootEl = document.querySelector(
          rootIdorClassName
        )! as HTMLDivElement;

        if (!this.rootEl) {
          throw new Error(
            `anchor ID or Class ${rootIdorClassName} is invalid!`
          );
        }
      } else {
        const allRoots = document.querySelectorAll(rootIdorClassName);
        this.rootEl = allRoots[listPos]! as HTMLDivElement;

        if (!this.rootEl) {
          throw new Error(
            `anchor ID or Class ${rootIdorClassName} is invalid!`
          );
        }
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
    if (!this.isManualInserted) {
      this.insertAt(insertWhere);
    }
  }

  public insertAtManually(where: InsertPosition, atEl: HTMLDivElement): void {
    if (!this.isManualInserted) {
      throw new Error(
        "This template injector did not set 'isManualInserted' to 'true'"
      );
    }

    this.rootEl = atEl;
    this.insertAt(where);
  }

  private insertAt(where: InsertPosition): void {
    this.rootEl.insertAdjacentElement(where, this.createdEl);
  }

  public removeMyself(): void {
    this.createdEl.remove();
  }
}
