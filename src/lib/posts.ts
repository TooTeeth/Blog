/*md 파일을 HTML 형식으로 바꿔줌 */

import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src", "post"); /*path: 경로찾기, join: 경로를 합쳐줌, process.cwd: -  절대 경로를 반환 - /app-routing-practice  */

export interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export function getSortedPostsData(): Array<Omit<PostData, "contentHtml">> {
  const fileNames = fs.readdirSync(postsDirectory); /* 모든 파일을 동기적으로 읽어옴 */
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); /*.md 확장자를 제거하여 *id* 생성 */
    const fullPath = path.join(postsDirectory, fileName); /*경로 내의 모든 파일 이름을 동기적으로 읽어옴 */
    const fileContents = fs.readFileSync(fullPath, "utf8"); /*마크다운 파일을 읽고 내용을 UTF-8 문자열 */
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`); /*id가 파일명 */
  const fileContent = fs.readFileSync(fullPath, "utf-8"); /*파일의 내용을 문자열로 반환. posts? 동기적으로 읽고, UTF-8로 디코딩  */
  const matterResult = matter(fileContent); /*matter(객체) 객체 형태로 메타데이터와 본문을 분리, fileContent는 마크다운 전체 파일 내용 */

  const processContent = await remark().use(html).process(matterResult.content);
  /*remark - 마크다운 처리 라이브러리, use(html) - 마크다운을 html로 변환, process - 반환, matterResult.content - 마크다운 본문*/
  const contentHtml = processContent.toString();
  /*processContent = remark().use(html).process(matterResult.content), toString = 변환된 HTML 내용을 문자열로 변환*/

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    /*matter()는 data 형태로 저장하기 때문에 data를 붙여야함. */
  };
}
