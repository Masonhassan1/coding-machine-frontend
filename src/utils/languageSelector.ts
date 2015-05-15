export default function changeInitialLanguage(language: string) {
  const cppStarter = `#include <iostream>
using namespace std;
int main()
{
    cout<<"Hello World";

    return 0;
}`;

  const javaStarter = `public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}`;

  const pythonStarter = `print ('Hello World')`;

  const finalStarter =
    language === "c++"
      ? cppStarter
      : language === "java"
      ? javaStarter
      : pythonStarter;
  return finalStarter;
}
