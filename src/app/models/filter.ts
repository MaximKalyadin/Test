export class Filter {
  constructor(
    public title: string = '',
    public publisher: string = '',
    public journals: string[] = []
  ) {
    this.title = title;
    this.publisher = publisher;
    this.journals = journals;
  }
}
