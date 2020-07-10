import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default FakeMailTemplateProvider;
