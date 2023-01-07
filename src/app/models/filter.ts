export class Filter {
  constructor(
    public title: string = '',
    public publisher: string = '',
    public journals: string[] = [],
    public isReload: boolean = true
  ) {
    this.title = title;
    this.publisher = publisher;
    this.journals = journals;
    this.isReload = isReload;
  }
}
