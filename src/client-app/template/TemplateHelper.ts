export class TemplateHelper<TyCreateEl extends HTMLElement> {
  private readonly _templateEl: HTMLTemplateElement;

  /**
   * rool element of this created element
   */
  private _rootEl: HTMLDivElement;

  private readonly _createdEl: TyCreateEl;
  /**
   * if not exists, it's falsy null
   */
  public get createdEl(): TyCreateEl {
    return this._createdEl;
  }

  private readonly _currentElSelector: string;
  /**
   * if not exists, it's falsy ""
   */
  public get currentElSelector(): string {
    return this._currentElSelector;
  }

  /**
   *
   * @param rootSelector to find root Element
   * @param templateSelector to find template
   * @param where insert position
   * @param isManualInserted deroute to insert manually the created element from template
   * @param listPos to identify which list is to insert this template
   */
  constructor(
    rootSelector: string,
    templateSelector: string,
    where: InsertPosition,
    private _isManuallyInserted?: boolean,
    listPos?: number
  ) {
    // 1. set up the anchor tag and the template tag
    this._templateEl = <HTMLTemplateElement>(
      document.getElementById(templateSelector)!
    );

    if (!this._templateEl) {
      throw new Error(`template selector ${templateSelector} is invalid!`);
    }

    // find root element unless it's being manually inserted
    if (!this._isManuallyInserted) {
      if (!listPos) {
        this._rootEl = <HTMLDivElement>document.querySelector(rootSelector)!;

        if (!this._rootEl) {
          throw new Error(`root selector ${rootSelector} is invalid!`);
        }
      } else {
        // find multiple roots (there are already other lists created)
        const allRoots = document.querySelectorAll(rootSelector);
        this._rootEl = <HTMLDivElement>allRoots[listPos]!;

        if (!this._rootEl) {
          throw new Error(`root selector ${rootSelector} is invalid!`);
        }
      }
    }

    // 2. import a node from the template
    const imported = document.importNode(this._templateEl.content, true);

    // 3. get the first element child of the imported node
    this._createdEl = <TyCreateEl>imported.firstElementChild;

    if (!this._createdEl) {
      throw new Error(`Element creation failed!`);
    }

    // 4. save id or class name of the created element.
    this._currentElSelector = this._createdEl.id
      ? `#${this._createdEl.id}`
      : "";
    this._currentElSelector = this._createdEl.className
      ? `.${this._createdEl.className}`
      : "";

    // 5. forward the position to insert the createdEl
    if (!this._isManuallyInserted) {
      this.insertAt(where);
    }
  }

  /**
   * @param where insert position of inserAdjacentElement
   * @param atEl insert position element
   */
  public insertAtManually(where: InsertPosition, atEl: HTMLDivElement) {
    if (!this._isManuallyInserted) {
      throw new Error(
        "This template injector did not set 'isManualInserted' to 'true'"
      );
    }

    this._rootEl = atEl;
    this.insertAt(where);
  }

  /** 
   * @param where insert position of inserAdjacentElement
  */
  private insertAt(where: InsertPosition) {
    this._rootEl.insertAdjacentElement(where, this._createdEl);
  }

  /**
   * remove created element
   */
  public removeMyself() {
    this._createdEl.remove();
  }
}
