import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from "@radix-ui/react-radio-group";
import { Textarea } from "./ui/textarea";

const targetData = [
  {
    value: "twitter",
    name: "twitter",
  },
  {
    value: "linkedin",
    name: "linkedin",
  },
  {
    value: "group_chat",
    name: "Group chat",
  },
] as const;

const formSchema = z.object({
  text: z
    .string()
    .max(2500, {
      message: "Text must be less than 2500 characters due to model limitations",
    })
    .min(1, { message: "Did forget to fill in the text?" }),
  audience: z.enum(["twitter", "linkedin", "group_chat"]),
  purpose: z.enum(["sell", "inform"]),
  customInstructions: z
    .string()
    .max(1000, "Custom instructions must be less than 1000 characters")
    .optional(),
});

export type ArticleSummarizerFormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (values: ArticleSummarizerFormSchema) => void;
  defaultValues?: ArticleSummarizerFormSchema;
  loading?: boolean;
};

export function ArticleSummarizerForm({
  onSubmit,
  defaultValues,
  loading,
}: Props) {
  const form = useForm<ArticleSummarizerFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      text: "",
      audience: "twitter",
      purpose: "sell",
      customInstructions: "",
    },
  });

  const submitHandler = form.handleSubmit((data) => onSubmit(data));

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <div className="pb-4 space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter text here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Target</FormLabel>
                <FormDescription>
                  Select the target audience for the generated content.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2"
                >
                  {targetData.map((target) => (
                    <FormItem className="" key={target.value}>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem
                            value={target.value}
                            className="sr-only"
                          />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <span className="block w-full p-2 text-center font-normal">
                            {target.name}
                          </span>
                        </div>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="inform">Inform</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Enter any custom instructions"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          aria-label="Submit"
          className="w-full"
          disabled={loading}
        >
          Generate
        </Button>
      </form>
    </Form>
  );
}
