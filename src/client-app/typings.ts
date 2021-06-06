export type TyHTMLCode = string;
export type TyEventListnerType = "click";
export type TyEventListner = (this: Document, e: Event) => any;

export type TyListener<Ty> = (cardOrList: Array<Ty>) => void;
