
 curl -sS -i http://127.0.0.1:8000/generate \
   -H "Content-Type: application/json" \
   --data '{"text":"Hello","max_new_tokens":20}'

 curl -sS -i -L "https://sturdy-goldfish-496q6vpg5pwhqq7x-8000.app.github.dev/generate" \
   -H "Content-Type: application/json" \
   --data '{"text":"What is the capital of France?","max_new_tokens":32}'


# This works on my machine :))
# curl -sS -i -L "https://verbose-space-lamp-697x5775rr5h7xg-8000.app.github.dev/generate" \
#   -H "Content-Type: application/json" \
#   --data '{"text":"What is the capital of France?","max_new_tokens":32}'

# Task use previous information 
# create a web based app iwth nice interface
# you should have two interface with pipes from hugging face
# 1) chat genertion 2) for text summarization

# use LLm, but make it work 
# your web page should be accessible for anyone 
