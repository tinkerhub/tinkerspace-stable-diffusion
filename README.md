# Stable Diffusion Experience for Tinkerspace

Database structure - List of request json objects

Request 
```
  {
    submitted_at : timestamp
    status : String with possible values -> "pending", "processing", "processed", "completed"
    text_prompt : String 
    result_image : String (url to result image)
  }
```
