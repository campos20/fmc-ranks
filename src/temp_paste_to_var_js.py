# this will be deleted after this project is complete
def main():
    template = """export function basicText() {
    var text = "%s";
    return text;
}"""

    var = ""

    text = open("raw_input.txt", "r", encoding="utf8").read()
    for x in text.split("\n"):
        if len(x.strip()) > 0:
            var += x+"\\n\\\n"
    print(var)
    
    with open("basicText.js", "w", encoding="utf8") as fout:
        fout.write(template%var)
    
main()


