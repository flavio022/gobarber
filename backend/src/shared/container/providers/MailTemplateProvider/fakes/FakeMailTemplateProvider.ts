import IParseMailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
